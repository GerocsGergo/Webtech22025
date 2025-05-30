import { Request, Response } from 'express';
import { Game } from '../entity/Game';
import { AppDataSource } from '../data-source';

export class GameController {

  private gameRepository = AppDataSource.getRepository(Game);


  createGame = async (req, res) => {
    try {

    } catch (err) {
      return this.handleError(res, err);
    }
  }

  getGameById = async (req, res) => {
    try {
  
  
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  modifyGame = async (req, res) => {
    try {
    
    } catch (err) {
      this.handleError(res, err);
    }
  }
  

  deleteGame = async (req, res) => {
    try {

    } catch (err) {
      return this.handleError(res, err);
    }
  }
  

  listAllGame = async (req, res) => {
    try {
     
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
