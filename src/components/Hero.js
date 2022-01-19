const Hero = ({ data }) => {
  console.log(data);

  //Fonction de randomisation utilisée pour définir l'index de l'objet jeux dont l'image aparait dans le HERO, celle-ci change à chaque rafraichissment

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return (
    <div className='hero'>
      <h2>{data.count} games in data-base.</h2>
      <img
        className='hero-img'
        src={data.results[getRandomInt(0, 20)].background_image}
        alt=''
      />
    </div>
  );
};

export default Hero;
