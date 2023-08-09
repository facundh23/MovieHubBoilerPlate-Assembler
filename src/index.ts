import config from './config/config';
import app from './server';


const PORT: string | number = config.app.PORT

app.listen(PORT, (): void => {
    console.log(`Server Running on port ${PORT}`);
})