const [mediaArray, setMediaArray] = useState([]);

const getMedia = async () => {
  const json = await fetchData('test.json');
  setMediaArray(json);
};
getMedia();

console.log(mediaArray);
