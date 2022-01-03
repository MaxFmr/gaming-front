import { useNavigate } from "react-router";

const SerieCaroussel = ({ serie }) => {
  const naigate = useNavigate();
  return (
    <div className='serie-caroussel'>
      {serie.results.map((episode) => {
        return (
          <div
            onClick={() => {
              naigate(`/game/${episode.id}`);
            }}
            className='caroussel-card'
          >
            <h2>{episode.name}</h2>
            <img src={episode.background_image} alt='' />
          </div>
        );
      })}
    </div>
  );
};

export default SerieCaroussel;
