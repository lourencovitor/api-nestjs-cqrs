import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
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
  }