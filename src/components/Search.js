const Search = ({
  setDateFrom,
  setDateTo,
  setPlatformFilter,
  platforms,
  setOrdering,
  setSearch,
}) => {
  return (
    <div className='search'>
      <div>
        <div>
          {" "}
          <input
            className='searchbar'
            placeholder='🔎   Search by name'
            type='text'
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        <div>
          <select
            onChange={(event) => setPlatformFilter(event.target.value)}
            name='platforms'
            id='platform-select'
          >
            <option value=''>Please choose a platform</option>

            {platforms.results.map((platform, index) => {
              return (
                <option key={index} value={platform.id}>
                  {platform.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <select
            onChange={(event) => setOrdering(event.target.value)}
            name='platforms'
            id='platform-select'
          >
            <option value=''>--Ordered by :--</option>

            <option value='name'>name</option>
            <option value='released'>released</option>
            <option value='added'>added</option>
            <option value='created'>created</option>
            <option value='rating'>rating</option>
          </select>
        </div>
      </div>
      <div>
        <div>
          <p>Date from :</p>{" "}
          <input
            type='date'
            onChange={(event) => {
              setDateFrom(event.target.value);
            }}
          />
        </div>
        <div>
          <p>To :</p>
          <input
            type='date'
            onChange={(event) => {
              setDateTo(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Search;
