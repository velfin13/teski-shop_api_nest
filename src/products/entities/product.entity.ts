import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    title: string;

    @Column('float', {
        default: 0
    })
    price: number;

    @Column('text', {
        nullable: true
    })
    description: string;

    @Column('text', {
        unique: true
    })
    slug: string;

    @Column('int', {
        default: 0
    })
    stock: number;

    @Column('text', {
        array: true,
        default: []
    })
    sizes: string[];

    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    @Column('text')
    gender: string;

    @OneToMany(
        () => ProductImage,
        productImage => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[]

    @BeforeInsert()
    checkInsertSlug() {
        if (!this.slug) {
            this.slug = this.title
        }
        this.slug = this.slug.toLocaleLowerCase().
            replaceAll(" ", "_").
            replaceAll("'", "");
    }

    @BeforeUpdate()
    checkUpdateSlug() {
        if (!this.slug) {
            this.slug = this.title
        }
        this.slug = this.slug.toLocaleLowerCase().
            replaceAll(" ", "_").
            replaceAll("'", "");
    }
}