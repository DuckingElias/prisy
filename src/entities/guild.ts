import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn } from "typeorm";
import { t as translate } from "../helpers/language.js";

@Entity()
export default class Guild extends BaseEntity {
	@PrimaryColumn()
	id: string;

	@Column()
	prefix: string;

	@Column()
	language: string;

	t(node: string, ...args: string[]) {
		return translate(this.language, node, ...args);
	}
}
