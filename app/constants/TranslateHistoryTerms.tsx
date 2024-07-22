import { HistoryChangesInterface } from "./types";

    export const TranslateSellerHistoryTerm = (history:HistoryChangesInterface, action:string, type:string) => {
        const TranslateHistoryActionItems = {
            "Delete Buyer": `Cliente "${history.state_old?.buyer?.name}" Removido`,
            "Update Buyer": `Cliente "${history.state_now?.buyer?.name}" Atualizado`,
            "Create Smart Registration": `Pergunta "${history.state_now?.question}" criada pelo Cadastro Inteligente`,
            "Update Smart Registration": `Pergunta "${history.state_now?.question}" editada pelo Cadastro Inteligente`,
            "Create New Buyer": `Cliente "${history.state_now?.name}" Criado`,
            "Update Campaing": `Campanha "${history.state_now?.title}" Atualizada`,
            "Create New Campaing": `Campanha "${history.state_now?.title}" Criada`,
            "Delete Campaing": `Campanha "${history.state_old?.title ? history.state_old?.title : `Sem título`}" deletada`,
            "Create Relations Buyer Tag": `Tag "${history.state_now?.tag}" adicionada ao(s) cliente(s)`,
            "Delete Relations Buyer Tag": `Tag "${history.state_old?.tag}" removida do(s) cliente(s)`,
            "Create New Tags": `Tag "${history.state_now?.name}" Criada`,
            "Update Conversation": `Conversa Atualizada: "${history.state_now?.motive}"`,
            "Create New Event": `Evento "${history.state_now?.title}" Registrado`,
            "Update State Machine": `Fluxos da Conversa "${history.state_now?.name}" Atualizada`,
            "Delete State Machine": `Fluxos da Conversa "${history.state_old?.name}" Deletado`,
            "Updadte AI Instructions": "Instruções da IA Atualizadas",
            "Import Buyers": `Clientes Importados para a Plataforma`,
            "Create Document AI": `Upload de Documento de IA: "${decodeURI(history.state_now?.file_url?.replace(/.*\//, ""))}"`,
            "Update Parameters": "Parâmetros Atualizados",
        }
        
        const HistoryAppIcon = {
            "Buyer": "users",
            "Smart Registration": "list",
            "Campaing": "paper-plane",
            "Conversation": "chat",
            "Event": "calendar",
            "State Machine": "balloon-plus",
            "Training": "sparkles",
            "Tags": "tag",
            "Parameters": "controls",
        }

        const HistoryCategoryTitle = {
            "Buyer": "Cliente",
            "Smart Registration": "Cadastro Inteligente",
            "Campaing": "Campanha",
            "Conversation": "Conversa",
            "Event": "Evento",
            "State Machine": "Fluxo da Conversa",
            "Training": "Treinamento",
            "Tags": "Tag",
            "Parameters": "Parâmetros da IA",
        }

        switch (type) {
            case "action":
                return TranslateHistoryActionItems[action as keyof typeof TranslateHistoryActionItems] ? TranslateHistoryActionItems[action as keyof typeof TranslateHistoryActionItems] : action;
            case "icon":
                return HistoryAppIcon[action as keyof typeof HistoryAppIcon] ? HistoryAppIcon[action as keyof typeof HistoryAppIcon] : action;
            case "categoria":
                return HistoryCategoryTitle[action as keyof typeof HistoryCategoryTitle] ? HistoryCategoryTitle[action as keyof typeof HistoryCategoryTitle] : action;
            default:
                return action;
    }
}
