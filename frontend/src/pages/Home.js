import React from 'react';
import Navigation from '../component/Navigation';

import BodyAnnonce from '../component/BodyAnnonce';

const Home = () => {

return (
    <div className="home">
            <Navigation />
            <section> 
                <h2>Offre d'emploi</h2>
                <BodyAnnonce />
            </section>
    </div>
)

}
   
export default Home;