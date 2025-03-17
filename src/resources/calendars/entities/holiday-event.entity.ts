import { Entity, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/resources/auth/entities/user.entity';
import { BaseEntity } from 'src/database';

@Entity({ name: 'holiday_events' })
export class HolidayEvent extends BaseEntity {
  @ApiProperty({ example: 'US' })
  @Column()
  countryCode: string;

  @ApiProperty({ example: "New Year's Day" })
  @Column()
  holidayName: string;

  @ApiProperty({ example: '2025-01-01' })
  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => User, (user) => user.holidayEvents, { onDelete: 'CASCADE' })
  user: User;
}
