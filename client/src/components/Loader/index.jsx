import PulseLoader from "react-spinners/PulseLoader";

function Loader({ size = "small", text }) 
{
    // Big
    if(size.trim().toLowerCase() === "big")
    {
        return (
            <>
                <h3 className='text-center fw-bold textTheme'> 
                    <PulseLoader color="#00bcd4" size={20} speedMultiplier={1.2} /> &nbsp; { text }
                </h3>                
            </>
        );
    }

    // Medium
    if(size.trim().toLowerCase() === "medium")
    {
        return (
            <>
                <h4 className='text-center fw-bold textTheme'> 
                    <PulseLoader color="#00bcd4" size={20} speedMultiplier={1.2} /> &nbsp; { text }
                </h4>                
            </>
        );
    }

    // Small
    if(size.trim().toLowerCase() === "small")
    {
        return (
            <>
                <h6 className='text-center fw-bold textTheme'> 
                    <PulseLoader color="#00bcd4" size={20} speedMultiplier={1.2} /> &nbsp; { text }
                </h6>                
            </>
        );
    } 
}

export default Loader;