import React,{useState, useEffect} from "react"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import {Estimate, GetEstimates, RenderEstimates} from "../../hooks/EstimatesHooks"
import PaginatedButtons from "../../components/Graphs/PaginatedButtons"
import {SearchBar} from "../../components/Search"

export default function Estimates(){

    const [estimates, setEstimates] = useState<Estimate[]>([]);
    const [price, setPrice] = useState<string>("");
    const [estimateFormDisplay, setEstimateFormDisplay] = useState<boolean>()
    const [currentPage, setCurrentPage] = useState(1);
    const [hidden, setHidden] = useState(false);
    const [suggestions, setSuggestions] = useState<React.JSX.Element | undefined>();
    const [searchValue, setSearchValue] = useState<string>("");

    const rowsPerPage = 4;
  
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    useEffect(()=>{
        GetEstimates((e:Estimate[])=>setEstimates(e));
    },[])

    const filterArray = ['carMake', 'carModel', 'carYear', 'service', 'firstName', 'lastName'];

    return(
        <main id = "estimate">
            <Nav pageHeading = {"Estimates"}/>
            <section>
            <PaginatedButtons currentPage = {currentPage} setCurrentPage = {(e:number)=>setCurrentPage(e)} rowsPerPage={rowsPerPage} cartLength={estimates.length}/>
            {SearchBar({hidden: hidden, setHidden: (e:boolean) => setHidden(e), suggestions: suggestions, setSuggestions: (e:React.JSX.Element)=>setSuggestions(e), searchValue: searchValue, setSearchValue: (e:string)=>setSearchValue(e), setData: (e:Estimate[])=>setEstimates(e), filterArray: filterArray, database: process.env.REACT_APP_DATABASE_ID, collection: process.env.REACT_APP_ESTIMATES_COLLECTION_ID})}

            {estimates.length ? RenderEstimates(estimates, price, (e:string)=>setPrice(e),estimateFormDisplay, (e:boolean)=>setEstimateFormDisplay(e), startIndex, endIndex) : <h1 className = "textAlignCenter">No results match your search, try again.</h1>}

            </section>
            <Footer/>
        </main>
    )
}
