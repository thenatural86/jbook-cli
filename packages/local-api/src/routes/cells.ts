import express from 'express'
import fs from 'fs/promises'
import path from 'path'
interface Cell {
  id: string
  content: string
  type: 'text' | 'code'
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router()

  const fullPath = path.join(dir, filename)

  router.get('/cells', async (req, res) => {
    // make sure cell storage file exists
    //if it does not exist, add in a default list if cells
    //read the file
    //parse a list of cells oit of it
    //send list of cells back to browser
  })

  router.post('/cells', async (req, res) => {
    //take the list of cells from the request object
    //serialize them
    const { cells }: { cells: Cell[] } = req.body
    //write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')

    res.send({ status: 'ok' })
  })

  return router
}
