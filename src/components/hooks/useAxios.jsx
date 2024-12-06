export default function() {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); //different!
    const [controller, setController] = useState();
  
    const axiosFetch = async (configObj) => {
      const { axiosInstance, method, url, requestConfig = {} } = configObj;
  
      try {
        const ctrl = new AbortController();
        setController(ctrl);
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
        });
  
        setResponse(res.data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      console.log(controller);
  
      // useEffect cleanup function
      return () => controller && controller.abort();
    }, [controller]);
  
    return [response, error, loading, axiosFetch];
};