import { Injectable } from '@nestjs/common';
import { Character } from '../character.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateCharacters {
  constructor(@InjectRepository(Character) private characterRepository: Repository<Character>) {}
}
