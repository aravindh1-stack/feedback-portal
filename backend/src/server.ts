import 'dotenv/config';
import app from './app';
import { connectDB } from './config/db';

const PORT = Number(process.env.PORT) || 3000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`API server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
