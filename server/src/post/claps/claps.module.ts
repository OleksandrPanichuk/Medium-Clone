import {Module} from '@nestjs/common'
import { ClapsService } from './claps.service';
import { ClapsResolver } from './claps.resolver';

@Module({
    providers:[ClapsResolver, ClapsService]
})
export class ClapsModule  {}