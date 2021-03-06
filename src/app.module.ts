import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { Verification } from './users/entities/verification.entity';
import { MailModule } from './mail/mail.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { Category } from './restaurants/entities/category.entity';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Dish } from './restaurants/entities/dish.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { CommonModule } from './common/common.module';
import { PaymentsModule } from './payments/payments.module';
import { Payment } from './payments/entities/payment.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { UploadsModule } from './uploads/uploads.module';
// nest가 앱의 구조를 조직하는 메타데이터를 제공
// DON'T FORGET!! main.ts로 import되는 유일한 모듈
// 같은 application을 가져, 연관이 깊은 단위를 feature module로 묶을 수도 있음
// imports : import된 모듈의 리스트
// controllers : 인스턴스화 되어야 하는 컨트롤러
// providers : nest의 injector에 의해 인스턴스화되고, 모듈 안에서 최소한으로 공유
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
        S3_ACCEESSKEY: Joi.string().required(),
        S3_SECRET_KEY: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      context: ({ req, connection }) => {
        const TOKEN_KEY = 'x-jwt';
        return {
          token: req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY],
        }; //웹 소켓과 http 모두 인증하기
      },
    }), //웹소켓엔 request가 없고 connection만 있기 때문에 resolver를 사용하려면 connection.context
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, // string => int
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging:
        process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
      entities: [
        User,
        Verification,
        Restaurant,
        Category,
        Dish,
        Order,
        OrderItem,
        Payment,
      ],
      // entity를 생성하고나면 여기서 꼭 import 해야한다!!! 꼭!!!!
    }),
    ScheduleModule.forRoot(),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }),
    CommonModule,
    AuthModule,
    UsersModule,
    RestaurantsModule,
    OrdersModule,
    PaymentsModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// consumer.apply(JwtMiddleware).forRoutes({
//   path: '*',
//   method: RequestMethod.ALL,
// });
//https://changhoi.github.io/posts/backend/nestjs-quicklearn-03/
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(JwtMiddleware).forRoutes({
//       path: '/graphql',
//       method: RequestMethod.ALL,
//     });
//   }
