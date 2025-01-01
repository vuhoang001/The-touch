import express from "express";
import { config } from 'dotenv'
import { setupCategoryHexagon } from "./modules/Categories";
import { sequelizeConfig } from "./shared/components/sequelize";
import { setupBrandHexagon } from "./modules/Brand/init";

config();

const app = express();
(async () => {

    try {
        await sequelizeConfig.authenticate();
        // sequelizeConfig.sync({ force: true })
        //     .then(() => {
        //         console.log('Database & tables created!');
        //     }).catch(err => console.log(err));
        // console.log(`Connection has been established successfully.`);

        const port = process.env.PORT || 3000;

        app.use(express.json());

        app.use('/v1', await setupCategoryHexagon(sequelizeConfig));
        app.use('/v1/brands', await setupBrandHexagon(sequelizeConfig));


        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error)
    }
})();

