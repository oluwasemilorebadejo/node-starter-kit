import Express, { Request, Response, NextFunction, Application } from "express";

const app: Application = Express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "welcome" });
});

app.listen(3000, (): void => {
  console.log("server running on port 3000");
});
