import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/database';
import { HolidayEvent } from 'src/resources/calendars/entities/holiday-event.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @ApiProperty({ example: 'Name' })
  @Column({ name: 'first_name', type: 'varchar', length: 50, nullable: true })
  firstName: string | null;

  @ApiProperty({ example: 'Last Name' })
  @Column({ name: 'last_name', type: 'varchar', length: 50, nullable: true })
  lastName: string | null;

  @ApiProperty({ example: 'example_email@example.com' })
  @Column({ type: 'varchar', length: 320, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @OneToMany(() => HolidayEvent, (holidayEvent) => holidayEvent.user, { eager: true })
  holidayEvents: HolidayEvent[];
}
