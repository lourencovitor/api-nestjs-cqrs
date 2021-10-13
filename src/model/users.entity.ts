import { generateHash } from 'src/utils/auth';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BeforeInsert,
    BeforeUpdate,
  } from 'typeorm';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn('uuid')
    public userId!: string;
  
    @Column()
    public name!: string;
  
    @Column({ unique: true })
    public email!: string;
  
    @Column({ select: false })
    public password!: string;
  
    @CreateDateColumn()
    created!: Date;
  
    @UpdateDateColumn()
    updated!: Date;
  
    @DeleteDateColumn()
    deletedAt?: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await generateHash(this.password);
    }

    @BeforeUpdate()
    async hashPasswordUpdate() {
        this.password = await generateHash(this.password);
    }
  }