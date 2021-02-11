import { InputType, Field, ObjectType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@InputType('DishInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Dish extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  @Length(3)
  name: string;

  @Field(() => String)
  @Column()
  @IsString()
  photo: string;

  @Field(() => Int)
  @Column()
  @IsNumber()
  price: number;

  @Field(() => String)
  @Column()
  @Length(5, 140)
  description: string;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  // @RelationId((dish: Dish) => dish.restaurant)
  // restaurantId: number;
}

// 관계로 가져올 때, restaurant 전체가 아닌 id만 필요로 할 때, relationId를 설정한다.
// restaurant에서도 owner의 정보가 아닌 owner의 id가 필요해서, 따로 설정함
