import { useEffect } from "react";
import api from "../api/api.jsx";
import { Button } from "../components/Button";
import { Search } from "../middleware/Interfaces/General";
import { Appointment } from "../middleware/Interfaces/Reservation.js";

//search
//enter value into search
//using appointment database, find appointment with string containing that value
//if none exist, return no results
//if exists, first show by exact wording and exact order of value
//then show by exacy wording but in any order
//re-render manageAppointments page to show this

export function SearchBar(props: Search) {
  function includeResults(appointments: Appointment[], dataFields: string[], check: boolean) {
    if (check) {
      const filteredData = appointments.filter((data: any) => {
        return Object.values(data).some((value) =>
          typeof value === "string"
            ? value.toLowerCase().includes(props.searchValue.toLowerCase())
            : "",
        );
      });

      const suggestedValues = dataFields.flatMap((field) =>
        filteredData.filter((data: any) =>
          data[field].toLowerCase().includes(props.searchValue.toLowerCase()),
        ),
      );

      const finalResults: Appointment[] = [];

      suggestedValues.forEach((value)=>{
        if(finalResults.indexOf(value) === -1){
          finalResults.push(value)
        }
      })

      return finalResults;
    } else {
      const filteredData = appointments.filter((data: any) => {
        return Object.values(data).some((value) =>
          typeof value === "string"
            ? value.toLowerCase().includes(props.searchValue.toLowerCase())
            : "",
        );
      });

      const suggestedValues = dataFields.flatMap((field) =>
        filteredData
          .filter((data: any) =>
            data[field].toLowerCase().includes(props.searchValue.toLowerCase()),
          )
          .map((data: any) => data[field]),
      );

      return suggestedValues;
    }
  }

  function exactResults(data: any[], dataFields: string[]) {
    const filteredData = data.filter((data: any) => {
      return Object.values(data).some((value) =>
        typeof value === "string"
          ? value.toLowerCase() === props.searchValue.toLowerCase()
          : "",
      );
    });

    const suggestedValues = dataFields.flatMap((field) =>
      filteredData.filter(
        (data: any) =>
          data[field].toLowerCase() === props.searchValue.toLowerCase(),
      ),
    );

    return suggestedValues;
  }

  async function searchResults() {
    try {
      const appointments = await api.listDocuments(
        props.database,
        props.collection,
      );

      const exactValues = exactResults(
        appointments.documents,
        props.filterArray,
      );
      const includeValues = includeResults(
        appointments.documents,
        props.filterArray,
        true,
      );

      props.setSearchValue("");
      if (exactValues.length && exactValues && props.searchValue) {
        props.setData(exactValues);
      } else if (includeResults.length && includeValues && props.searchValue) {
        props.setData(includeValues);
      } else {
        props.setData([]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  //type search value
  //as a new letter is entered in search bar, list possible choices user can make based on the letters in search bar so far
  //like if the user inputs el, suggest "Kyrielight", "Elizabeth" or "Fuel Systems".
  //if the user clicks on one of these suggestions, the search value becomes that suggestion

  function AutoSuggest(searchValue: string) {
    useEffect(() => {
      async function searchSuggest() {
        try {
          const appointments = await api.listDocuments(
            props.database,
            props.collection,
          );

          const suggestedValues = includeResults(
            appointments.documents,
            props.filterArray,
            false,
          );
          const removeDuplicates: string[] = [];

          suggestedValues.forEach((value: string) =>
            removeDuplicates.indexOf(value) === -1
              ? removeDuplicates.push(value)
              : "",
          );
          console.log(props.searchValue)

          let i = 0;
          const list = removeDuplicates.map((value: string) => {
            if (
              props.searchValue &&
              value.toLowerCase().includes(props.searchValue.toLowerCase())
            ) {
              return (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    props.setSearchValue(value);
                    searchResults();
                  }}
                  key={i++}
                  className="auto-button"
                >
                  {value}
                </button>
              );
            }
          });

          const results = (
            <>
              {props.searchValue ? (
                <div className="h-24vh border-radius-10px p-2 flex flex-col absolute bg-white min-20 mt-6">
                  {list}
                </div>
              ) : (
                ""
              )}
            </>
          );

          props.setSuggestions(results);
        } catch (err) {
          console.error(err);
        }
      }

      searchSuggest();
    }, [searchValue]);

    return props.suggestions;
  }

  async function filterByValue(filter: string) {
    try {
      const data = await api.listDocuments(props.database, props.collection);

      if (filter === "make") {
        const sortData = data.documents.sort((a: any, b: any) =>
          a.carMake.localeCompare(b.carMake),
        );
        props.setData(sortData);
      } else if (filter === "model") {
        const sortData = data.documents.sort((a: any, b: any) =>
          a.carModel.localeCompare(b.carModel),
        );
        props.setData(sortData);
      } else if (filter === "year") {
        const sortData = data.documents.sort(
          (a: any, b: any) => parseInt(a.carYear) - parseInt(b.carYear),
        );
        props.setData(sortData);
      } else if (filter === "service") {
        const sortData = data.documents.sort((a: any, b: any) =>
          a.service.localeCompare(b.service),
        );
        props.setData(sortData);
      } else if (filter === "time") {
        const sortData = data.documents.sort((a: any, b: any) => {
          const aDate = new Date(a.date.split("D")[0]);
          const bDate = new Date(b.date.split("D")[0]);

          if (aDate < bDate) {
            return -1;
          } else if (aDate > bDate) {
            return 1;
          } else {
            return 0;
          }
        });
        props.setData(sortData);
      } else if (filter === "firstName") {
        const sortData = data.documents.sort((a: any, b: any) =>
          a.firstName.localeCompare(b.firstName),
        );
        props.setData(sortData);
      } else if (filter === "lastName") {
        const sortData = data.documents.sort((a: any, b: any) =>
          a.lastName.localeCompare(b.lastName),
        );
        props.setData(sortData);
      }
    } catch (err) {
      console.error(err);
    }

    //filter buttons
    //select from date, model, make, year or service, name
    //when selected, it will re-render appointments based on that filter alphabetically/recent-latest
  }

  function searchFilters() {
    const options = props.filterArray.map((filter: string) => {
      return (
        <option key={filter} value={filter}>
          Filter by {filter}
        </option>
      );
    });

    return (
      <select onChange={(e) => filterByValue(e.target.value)}>{options}</select>
    );
  }

  async function clearSearch(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    const appointments = await api.listDocuments(
      props.database,
      props.collection,
    );
    props.setData(appointments.documents);
    console.log(props.data);
  }

  return (
    <form className="flex w-full">
      <section className="flex justify-between w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex w-full">
            <input
              type="search"
              value={props.searchValue}
              onChange={(e) => props.setSearchValue(e.target.value)}
            />
            {AutoSuggest(props.searchValue)}
            {Button({
              text: "Search",
              handleButtonClick: (e) => {
                e.preventDefault();
                searchResults();
              },
            })}

            {Button({
              text: "Clear Search",
              handleButtonClick: (e) => {
                clearSearch(e);
              },
            })}
          </div>

          {searchFilters()}
        </div>
      </section>
    </form>
  );
}
