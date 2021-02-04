import { Field, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  @IsNumber()
  id: number;

  @CreateDateColumn()
  @Field(() => Date)
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  @IsDate()
  updateAt: Date;
}
