import { Request, Response } from 'express';
import { Game } from '../entity/Game';
import { AppDataSource } from '../data-source';
import { JatekKategoria } from '../enums/game-category.enum';
import { Platform } from '../enums/platform.enum';
import { Like } from 'typeorm';

export class GameController {

  private gameRepository = AppDataSource.getRepository(Game);

  createGame = async (req, res) => {
    try {
      const { cim, kategoria, platform } = req.body;
  

      if (!cim || !kategoria || !platform) {
        return res.status(400).json({ message: 'Cím, beszerzés dátuma, kategória és platform szükséges.' });
      }

      if (!Object.values(JatekKategoria).includes(kategoria)) {
        return res.status(400).json({ message: `Érvénytelen kategória. Lehetséges értékek: ${Object.values(JatekKategoria).join(', ')}` });
      }
  
      if (!Object.values(Platform).includes(platform)) {
        return res.status(400).json({ message: `Érvénytelen platform. Lehetséges értékek: ${Object.values(Platform).join(', ')}` });
      }
  
      const dateObj = new Date();
  
      const existingGame = await this.gameRepository.findOneBy({ cim });
      if (existingGame) {
        return res.status(409).json({ message: 'Már létezik ilyen című játék.' });
      }
  
      const newGame = this.gameRepository.create({
        cim,
        beszerzes_datuma: dateObj,
        kategoria,
        platform,
      });
  
      await this.gameRepository.save(newGame);
  
      return res.status(201).json(newGame);
  
    } catch (err) {
      return this.handleError(res, err);
    }
  }
  

  getGame = async (req, res) => {
    try {
      const { id, cim, kategoria, platform } = req.query;
  
      if (id !== null && !isNaN(id)) {
        const game = await this.gameRepository.findOneBy({ sorszam: Number(id) });
        if (!game) return res.status(404).json({ message: 'Játék nem található ezzel az ID-vel.' });
        return res.json(game);
      }
  
      if (cim) {
        const game = await this.gameRepository.find({
          where: {
            cim: Like(`%${cim}%`)
          }
        });
        if (!game) return res.status(404).json({ message: 'Játék nem található ezzel a címmel.' });
        return res.json(game);
      }
  
      if (kategoria) {
        const games = await this.gameRepository.findBy({ kategoria });
        if (!games.length) return res.status(404).json({ message: 'Nincs játék ebben a kategóriában.' });
        return res.json(games);
      }
  
      if (platform) {
        const games = await this.gameRepository.findBy({ platform });
        if (!games.length) return res.status(404).json({ message: 'Nincs játék ezen a platformon.' });
        return res.json(games);
      }
  
      return res.status(400).json({ message: 'Adj meg legalább egy keresési paramétert: id, cim, kategoria vagy platform.' });
  
    } catch (err) {
      return this.handleError(res, err);
    }
  };
  
  

  modifyGame = async (req, res) => {
    try {
    
    } catch (err) {
      this.handleError(res, err);
    }
  }
  

  deleteGame = async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!id) {
        return res.status(400).json({ message: 'Érvénytelen azonosító.' });
      }
  
      const game = await this.gameRepository.findOneBy({ sorszam: id });
      if (!game) {
        return res.status(404).json({ message: 'A játék nem található.' });
      }
  
      await this.gameRepository.remove(game);
  
      return res.json({ message: 'Játék sikeresen törölve.' });
    } catch (err) {
      return this.handleError(res, err);
    }
  };
  
  

  getAllGame = async (req, res) => {
    try {
      const games = await this.gameRepository.find();

      return res.json(games);
    } catch (err) {
      return this.handleError(res, err);
    }
  };

  handleError(res: Response, err: any, status = 500, message = 'Unknown server error.'): Response {
    if (err) {
      console.error(err);
    }
    return res.status(status).json({ message });
  }

}
