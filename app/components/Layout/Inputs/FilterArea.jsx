import React from "react";
import InputField from "./InputField";
import moment from "moment";

const propertyFixes = [
  { original_title: "preco", title: "Preço" },
  { original_title: "piloto_automatico", title: "Piloto Automático" },
  { original_title: "status_atendimento", title: "Estado do Atendimento" },
  { original_title: "atendimento_andamento", title: "Em Atendimento" },
  { original_title: "dt_alteracao", title: "Data" },
  { original_title: "dt_criacao", title: "Data" },
  { original_title: "created_at", title: "Data" },
  { original_title: "updated_at", title: "Data" },
  { original_title: "active", title: "Ativo" },
  { original_title: "due_date", title: "Data de Expiração" },
];

export default function FilterArea({
  originalData = [],
  dataToFilter = [],
  filteredData,
  centered = false,
  removeAllofThisDataAndkeepNaoInformado = [],
}) {
  const [filterText, setFilterText] = React.useState("");
  const [filterOptions, setFilterOptions] = React.useState([]); //array of objects like this: {propertyTitle: '', searchFor: ''}

  //function to filter data
  const mountFilterData = (data, filterOp) => {
    //check if data is not empty
    if (data.length === 0)
      return (
        <InputField
          type="search"
          placeholder="Pesquise por nome ou detalhes..."
          value={""}
          onChange={() => {}}
        />
      );

    //get all keys from data
    let formatedData =
      originalData.length > 0 ? Object.keys(originalData[0]) : [];

    //remove the keys that are not in the filterOptions
    formatedData = formatedData.filter((item, index) =>
      filterOp.includes(item),
    );

    //remove duplicated keys and set the data as an array of objects
    formatedData = formatedData.map((item, index) => ({
      title: item,
      value: [],
    }));
    //loop through the original data and record the values inside the formatedData array in each object that has the same title

    if (originalData.length > 0) {
      originalData.forEach((item, index) => {
        Object.keys(item).forEach((key, index) => {
          formatedData.forEach((item2, index2) => {
            if (item2.title === key) {
              if (!item2.value.includes(item[key])) {
                item2.value.push(item[key]);
              }
            }
          });
        });
      });
    }

    //return the formated data as select options
    let renderData = formatedData.map((item, index) => {
      return (
        <div
          key={index}
          className={`flex flex-col px-2 w-auto hidden md:flex `}
        >
          <InputField
            selectInlineLabel
            label={
              propertyFixes.filter(
                (item2, index2) => item2.original_title === item.title,
              ).length > 0
                ? `${propertyFixes.filter((item2, index2) => item2.original_title === item.title)[0].title}`
                : item.title
                    .split(" ")
                    .map((item2, index2) => {
                      return item2.charAt(0).toUpperCase() + item2.slice(1);
                    })
                    .join(" ")
            }
            type="select"
            onChange={(e) => {
              // context: the filterOptions have objects like {propertyTitle: '', searchFor: ''}
              if (e.target.value === "all") {
                setFilterOptions(
                  filterOptions.filter(
                    (item2, index2) => item2.propertyTitle !== item.title,
                  ),
                );
                filterData(
                  filterText,
                  filterOptions.filter(
                    (item2, index2) => item2.propertyTitle !== item.title,
                  ),
                );
              } else {
                if (
                  filterOptions.filter(
                    (item2, index2) => item2.propertyTitle === item.title,
                  ).length > 0
                ) {
                  setFilterOptions(
                    filterOptions.map((item2, index2) => {
                      if (item2.propertyTitle === item.title) {
                        return {
                          propertyTitle: item.title,
                          searchFor: e.target.value,
                        };
                      } else {
                        return item2;
                      }
                    }),
                  );
                  filterData(
                    filterText,
                    filterOptions.map((item2, index2) => {
                      if (item2.propertyTitle === item.title) {
                        return {
                          propertyTitle: item.title,
                          searchFor: e.target.value,
                        };
                      } else {
                        return item2;
                      }
                    }),
                  );
                } else {
                  setFilterOptions([
                    ...filterOptions,
                    { propertyTitle: item.title, searchFor: e.target.value },
                  ]);
                  filterData(filterText, [
                    ...filterOptions,
                    { propertyTitle: item.title, searchFor: e.target.value },
                  ]);
                }
              }
            }}
          >
            <option value="all">Todos</option>
            {/* //Check if the value is a number or date */}
            {!Number.isInteger(item.value[0]) &&
            !moment(item.value[0]).isValid() ? (
              item.value.map((item2, index2) => {
                return removeAllofThisDataAndkeepNaoInformado.includes(
                  item.title,
                ) && item2 !== "Não Informado" ? null : (
                  <option key={index2} value={item2}>
                    {item2 === true || item2 === false
                      ? item2 === true
                        ? "Sim"
                        : "Não"
                      : item2
                          .split(/[_\s]+/)
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase(),
                          )
                          .join(" ")}
                  </option>
                );
              })
            ) : (
              <>
                <option value={"lower_first"}>
                  {item.title === "data" ||
                  item.title === "dt_alteracao" ||
                  item.title === "dt_criacao" ||
                  item.title === "created_at" ||
                  item.title === "updated_at" ||
                  item.title === "due_date"
                    ? "Antigos Primeiro"
                    : "Menores primeiro"}
                </option>
                <option value={"higher_first"}>
                  {item.title === "data" ||
                  item.title === "dt_alteracao" ||
                  item.title === "dt_criacao" ||
                  item.title === "created_at" ||
                  item.title === "updated_at" ||
                  item.title === "due_date"
                    ? "Recentes Primeiro"
                    : "Maiores primeiro"}
                </option>
              </>
            )}
          </InputField>
        </div>
      );
    });

    //add a free text search input
    renderData.push(
      <div
        key={formatedData.length}
        className={`flex flex-col px-2 w-full md:w-auto`}
      >
        <div className="md:w-[20vw] min-w-[200px] w-auto">
          <InputField
            type="search"
            placeholder="Pesquise por nome ou detalhes..."
            value={filterText}
            onChange={(e) => {
              filterData(e.target.value, filterOptions);
              setFilterText(e.target.value);
            }}
          />
        </div>
      </div>,
    );

    return renderData.reverse();
  };

  //Filter Method
  const cleanSearchInput = (input) =>
    input !== undefined &&
    input
      .toString()
      .replace(/[^0-9a-zA-Z]/g, "")
      .toLowerCase();

  const filterData = async (dataToFilter, filterOptionsState) => {
    console.log(filterOptionsState);

    const cleanedSearchInput = cleanSearchInput(dataToFilter);

    let filtered = cleanedSearchInput
      ? originalData.filter((item) =>
          Object.values(item).some((value) =>
            cleanSearchInput(value !== null && value.toString()).includes(
              cleanedSearchInput,
            ),
          ),
        )
      : originalData;

    filterOptionsState.forEach((item) => {
      if (item.searchFor === "lower_first") {
        filtered = filtered.sort(
          (a, b) => a[item.propertyTitle] - b[item.propertyTitle],
        );
      } else if (item.searchFor === "higher_first") {
        filtered = filtered.sort(
          (a, b) => b[item.propertyTitle] - a[item.propertyTitle],
        );
      } else {
        const cleanedFilterValue = cleanSearchInput(item.searchFor);
        filtered = filtered.filter((item2) =>
          cleanSearchInput(item2[item.propertyTitle].toString()).includes(
            cleanedFilterValue,
          ),
        );
      }
    });

    const uniqueFiltered = [...new Set(filtered)];
    filteredData(uniqueFiltered);
  };

  return (
    <div className={`flex flex-col mt-10`}>
      <div
        className={`flex flex-row items-center ${centered ? "justify-center" : ""}`}
      >
        {mountFilterData(originalData, dataToFilter)}
      </div>
    </div>
  );
}
