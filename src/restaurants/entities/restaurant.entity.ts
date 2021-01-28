// database model
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({ isAbstract: true }) // 스키마에 포함되길 원치 않음 (dto)
@ObjectType() //forGraphQL
@Entity() //forTypeORM
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Field(() => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field(() => Boolean, { defaultValue: false }) //forGraphQL, defaultValue !== nullable
  @Column({ default: false }) //forTypeORM
  @IsOptional() //forDTO
  @IsBoolean() //forDTO
  isVegan: boolean;

  @Field(() => String)
  @Column()
  @IsString()
  address: string;

  @Field(() => String)
  @Column()
  @IsString()
  ownerName: string;

  @Field(() => String)
  @Column()
  @IsString()
  categoryName: string;
}
