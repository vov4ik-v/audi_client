export default{
    differenceTimes(createdDate,nowDate){
        let response = {
            number: 0,
            // min/hour/second/year/week
            type:""
        }
        let result = (new Date(nowDate).getTime() - new Date(createdDate).getTime())/1000
        switch (true) {
            case result<59:
                response = {number:Math.trunc(result),type:"second"}
                break;
            case result/60<59:
                response = {number:Math.trunc(result/60),type:"minutes"}
                break;
            case result/60/60<24:
                response = {number:Math.trunc(result/60/60),type:"hours"}
                break;
            case result/60/60/24<30:
                response = {number:Math.trunc(result/60/60/24),type:"days"}
                break;
                //ЦЕЙ БЛОК ПЕРЕРОБИТИ
            case result/60/60/24/30<30:
                response = {number:Math.trunc(result/60/60/24/30),type:"month"}
                break;
            default:
                response = {number:0,type:"0"}
        }
        return response
    },
    getTimeFormat(createdDate){
        let response = {
            date:""
        }
        let result = new Date(createdDate)
        response.date =  result.getDate()+"/"+result.getMonth()+"/"+result.getFullYear()
        return response

    }

}