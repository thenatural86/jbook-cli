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
    try {
      //read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' })

      res.send(JSON.parse(result))
    } catch (error) {
      if (error.code === 'ENOENT') {
        // add code to create a file and add default cells
      } else {
        throw error
      }
    }
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
