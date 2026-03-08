import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { Roles } from '../auth/decorators/role-decorator';
import { Role } from '../auth/enums/role-enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  
  @Post()
  @Roles(Role.ADMIN, Role.MEMBER)
  add(@Req() req, @Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.addToFavorites(req.user.id, createFavoriteDto.carId);
  }

  @Get()
  @Roles(Role.ADMIN, Role.MEMBER, Role.VISITOR)
  getUserFavorites(@Req() req) {
    return this.favoritesService.getUserFavorites(req.user.id);
  }

  @Roles(Role.ADMIN, Role.MEMBER)
  @Delete(':carId')
  remove(@Req() req, @Param('carId') carId: number) {
    return this.favoritesService.remove(req.user.id, carId);
  }
}
