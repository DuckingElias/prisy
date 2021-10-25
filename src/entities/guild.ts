import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export default class Guild extends BaseEntity {
	@PrimaryColumn()
	id: string;
}
