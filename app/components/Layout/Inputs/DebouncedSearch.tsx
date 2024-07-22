import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import InputField from "./InputField";

export const DebouncedSearch = ({
    initialValues,
    callback,
    inputClassNames,
    removeFieldsList,
}: {
    initialValues: any;
    callback: (query: any) => void;
    inputClassNames?: string;
    removeFieldsList?: string[];
}) => {
    const [query, setQuery] =
        useState<any>(initialValues);
    const delayedQuery = useCallback( // eslint-disable-line
        _.debounce((q) => {
            callback(q); // Chama o callback com o valor da consulta
        }, 1000),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const onChange = (searchParams: any) => {
        setQuery((prevQuery: any) => ({
            ...prevQuery,
            ...searchParams,
        }));
        delayedQuery({ ...query, ...searchParams });
    };

    useEffect(() => {
        return () => {
            delayedQuery.cancel(); // Cleanup debounce on unmount
        };
    }, [delayedQuery]);

    return (
        query && <div className="flex gap-3">
            {/* SEARCH */}
            {query.hasOwnProperty('search') && !removeFieldsList?.includes('search') &&
                <div>
                    <InputField
                        className={inputClassNames}
                        type="search"
                        value={query.search}
                        label="Pesquisar"
                        onChange={(e) => {
                            let oldBuyerQuery = query;
                            oldBuyerQuery = { ...query, search: e.target.value };
                            onChange(oldBuyerQuery);
                        }}
                        placeholder="Digite para pesquisar"
                    />
                </div>}

            {/* FREE TALK */}
            {query.hasOwnProperty('free_talk') && !removeFieldsList?.includes('free_talk') &&
                <div>
                    <InputField
                        type="select"
                        label="Conversação Livre"
                        placeholder="Status"
                        value={query.free_talk}
                        onChange={(e) => {
                            let oldBuyerQuery = query;
                            oldBuyerQuery = { ...query, free_talk: e.target.value };
                            onChange(oldBuyerQuery);
                        }}
                    >
                        <option value="">Todos</option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </InputField>
                </div>
            }

            {/* BILLING WINDOW */}
            {query.hasOwnProperty('billing_window') && !removeFieldsList?.includes('billing_window') &&
                <div>
                    <InputField
                        type="select"
                        label="Janela de Cobrança"
                        placeholder="Status"
                        value={query.billing_window}
                        onChange={(e) => {
                            let oldBuyerQuery = query;
                            oldBuyerQuery = { ...query, billing_window: e.target.value };
                            onChange(oldBuyerQuery);
                        }}
                    >
                        <option value="">Todos</option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </InputField>
                </div>
            }
        </div>

    );
};