import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string

    @Column('text', {
        unique: true
    })
    username: string

    @Column('text')
    name: string

    @Column('text')
    lastname: string

    @Column('text',{
        select:false
    })
    password: string

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @Column('bool', {
        default: true,
    }
    )
    isActive: boolean

    @BeforeInsert()
    checkFildsBeforeInserts(){
        this.email = this.email.toLocaleLowerCase().trim()
    }

    @BeforeUpdate()
    checkFildsBeforeUpdate(){
        this.email = this.email.toLocaleLowerCase().trim()
    }
}
