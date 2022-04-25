import React,{ Fragment, useEffect, useState} from 'react'
import MetaData from './layout/MetaData'
import {Link} from 'react-router-dom'
import LightSpeed from 'react-reveal/LightSpeed';
import Slide from 'react-reveal/Slide';
import Bounce from 'react-reveal/Bounce';
import Zoom from 'react-reveal/Zoom';

const Home = () => {


   

	return(
					<Fragment>

					<style>{'body {overflow:hidden; font-family: var(--font-base-family, sans-serif); background: var(--color-light); color: var(--color-black);display: grid;grid-template-columns: 1.4fr 1fr;line-height: var(--line-height);padding: 0 0 0 5rem; }'}</style>

					<header className="header" role="banner" aria-label="The Top">
					  <div className="header__wrapper">
					  <Zoom>
					    <h1 className="header__logo"><img src="/images/logo.png" style={{width:"15%"}}/></h1>
					    </Zoom>
					  </div>
					</header>

					<div className="row">

						<div className="col-md-7 mt-5">
						<main className="[ flow ] [ main ]">

							<LightSpeed left>
							  <h2 className="main__heading">Meet Your New Bastfriend</h2>
							  <p className="main__sub">The Petmania animal shelter is a non profit organization that rescues stray dogs and cats.</p>
						 	 </LightSpeed>


						 	<br/>
						 	 <Bounce bottom>
						 	 	<div>
								  <Link to="/" ><button className="main__button"  style={{display:"inline"}}>Explore</button></Link> &nbsp;&nbsp;
								  <Link to="/login"><button className="main__button">Login</button></Link>
								</div>
								</Bounce>
						</main>
						</div>

						<div className="col-md-3">
						<Slide right>
							<section className="section__img" style={{position:"relative",}}>
						  {/*<img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/121170855/original/7897db7d1009f99f70d84563d08fdc4faab6d9c9/make-high-quality-vector-art-of-your-pets-or-any-animals.jpg"/>*/}
							<img src="http://cen.acs.org/content/dam/cen/98/web/4/WEB/20200410lnp4-pets.jpg" style={{width:"800px"}}/>
						{/*<img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/110993020/original/753647ab9dd599dd2a12b8f38fd6de0fe147e95f/make-vectors-portraits-your-dog-cat-or-pet.jpg" style={{width:"600px"}}/>*/}
						
						</section>
						</Slide>
						</div>

					</div>


    </Fragment>
		)
}

export default Home