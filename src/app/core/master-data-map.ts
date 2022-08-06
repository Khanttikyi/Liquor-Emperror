import { forkJoin, Observable, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { MasterDataService } from "../modules/master-data/master-data.service";
import { ConfigInput } from "../pages/form-component/field.interface";

export function getMasterValue(masterServer: MasterDataService, response: any, column: ConfigInput[], editing: boolean = false): Observable<any> {

  if (Array.isArray(response) && response.length > 0) {
    return of(response).pipe(map((result: any[]) => {
      let masterPost = []
      let resource = result.map((res) => {
        let masterObj = (res.data as any[]).filter(x => (x.value + "" as string).startsWith("T-") || (x.value + "" as string).startsWith("TA-"))
        if (masterObj.length > 0) {
          let postData = masterObj.map(x => {
            let columnName = column.find(col => col.name == x.column)
            if (columnName.masterData) {
              return {
                "codeId": x.value,
                "codeType": columnName.masterData,
                "langCd": "EN"
              }
            }
          })
          masterPost.push(...postData)
        }
      })

      return { result, masterPost }
    }), mergeMap((result: any) => {

      if (result.masterPost.length > 0) {
        let postData = {
          "codeBookRequest": result.masterPost
        }
        return masterServer.getMasterValue(postData).pipe(map((masterValues: any) => {
          return result.result.map(resp => {
            resp.data = resp.data.flatMap(x => {
              if ((x.value + "").startsWith("T-") || (x.value + "").startsWith("TA-")) {
                let columnName = column.find(col => col.name == x.column)
                let index = masterValues.findIndex(master => master.codeId == x.value && columnName.masterData == master.codeType)
                if (index >= 0) {
                  if (editing) {
                    return [x, { column: x.column + "Value", value: masterValues[index].codeName }]
                  } else {
                    x.value = masterValues[index].codeName
                  }
                }
              }
              return x
            })
            return resp
          })
          // return result
        }))
      }
      return of(result.result)
    }))
  }
  return of(response)

}

// return masterServer.getMasterValue(postData).pipe(map((x: any) => {
//   return x.map(masterD => {
//     let index = res.data.findIndex(val => val.value == masterD.codeId)
//     res.data[index].value = masterD.codeName
//     return res.data[index]
//   })
// }), mergeMap((res2) => {

//   let masterObj = (res.data as any[]).filter(x => !(x.value + "" as string).includes("T-"))
//   console.log([...masterObj, ...res2]);

//   return of({ data: [...masterObj, ...res2] })
// })
// )
// export function getMasterValue(masterServer: MasterDataService, response: any, column: ConfigInput[]): Observable<any> {
//   console.log(response);

//   if (Array.isArray(response) && response.length > 0) {
//     return of(response).pipe(mergeMap((result: any[]) => {
//       return forkJoin(result.map((res) => {
//         let masterObj = (res.data as any[]).filter(x => (x.value + "" as string).includes("T-"))

//         if (masterObj.length > 0) {
//           let postData = {
//             "codeBookRequest": []
//           }
//           postData.codeBookRequest = masterObj.map(x => {
//             let columnName = column.find(col => col.name == x.column)
//             if (columnName.masterData) {
//               return {
//                 "codeId": x.value,
//                 "codeType": columnName.masterData,
//                 "langCd": "EN"
//               }
//             }

//           })

//           return masterServer.getMasterValue(postData).pipe(map((x: any) => {
//             return x.map(masterD => {
//               let index = res.data.findIndex(val => val.value == masterD.codeId)
//               res.data[index].value = masterD.codeName
//               return res.data[index]
//             })
//           }), mergeMap((res2) => {

//             let masterObj = (res.data as any[]).filter(x => !(x.value + "" as string).includes("T-"))
//             console.log([...masterObj, ...res2]);

//             return of({ data: [...masterObj, ...res2] })
//           })
//           )
//         }
//         return of(res)
//         // res.data.map(x => {
//         //   if((x.value as string).includes("T-")){

//         //   }
//         // })
//       }))
//     }))
//     // response.map(x=> {
//     //   x.data.map()
//     // })
//   }
//   return of(response)

// }