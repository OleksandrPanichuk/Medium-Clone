import { Module } from '@nestjs/common';
import { ListsService} from './lists.service';
import { ListsResolver } from './lists.resolver';

@Module({
  providers: [ListsService, ListsResolver]
})
export class ListsModule {}
