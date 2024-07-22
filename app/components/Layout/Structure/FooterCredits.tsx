import moment from "moment"

export const FooterCredits = () => {
    return <div className="mb-10 text-center mt-5 text-cloudy-blue dark:text-light-grey/25">
        (c) Bren {moment().format("YYYY")}. Todos os direitos reservados.
    </div>
}