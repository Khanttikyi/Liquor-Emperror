import { Injectable, forwardRef, Inject } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

declare var window: any;
const SQL_DB_NAME = 'liquor_emperor.db';

@Injectable()
export class DatabaseService {
    databaseObj: SQLiteObject;

    readonly database_name: string = "liquor_emperor.db";
    database = null;
    tables_data: string[];
    userInfo
    dbInstance: any;
    public database_instance: any;
    branchCode: string
    initDatabase = new Subject<string>()
    updateingMasterData = new Subject<boolean>()
    //@Inject(forwardRef(() => MasterDataService)) private masterData: MasterDataService
    constructor(private sqlite: SQLite, private platform: Platform, private sqlitePorter: SQLitePorter, private http: HttpClient) {
        //this.database = window.openDatabase(this.database_name, '1.0', 'database', 5 * 1024 * 1024);
        // this.init()

    }



    async createDB(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.sqlite.create({
                name: SQL_DB_NAME,
                location: 'default'
            })
                .then(async (db: SQLiteObject) => {
                    this.databaseObj = db;
                    await this.createTableWithSql();
                    await this.createTable();

                })
                .catch(e => {
                    // console.log("error " + JSON.stringify(e))
                });
        });

    }

    async createTable(): Promise<any> {
        for (var i = 0; i < this.tables_data.length; i++) {
            try {
                let dbtable = await this.database_instance.executeSql(new Query(this.tables_data[i]))

            } catch (error) {
                // console.log("error " + JSON.stringify(error))
            }

        }
    }


    async init() {
        let db: any;
        if (this.platform.is('ios') || this.platform.is('android')) {
            this.database = await this.sqlite.create({ name: SQL_DB_NAME, location: 'default' })
        } else {
            this.database = window.openDatabase(SQL_DB_NAME, '1.0', 'DEV', 5 * 1024 * 1024);
        }
        // console.log('enter init')
        this.createTableWithSql();
        this.database_instance = await browserDBInstance(this.database);
        await this.createTable();
        await this.initData()
    }

    async createTables() {
        for (var i = 0; i < this.tables_data.length; i++) {
            let query = new Query(this.tables_data[i], []);
            await this.database_instance.executeSql(query);
        }
    }

    public create(tableName, item) {
        let sqlText;
        let values;
        // console.log("categorycode", item)
        switch (tableName) {
            case "CATEGORY":
                sqlText = "INSERT INTO CATEGORY (categoryName, categoryCode, categoryDescription, createddate, updateddate) VALUES (?,?,?,?,?) ";
                values = [item.categoryName || null, item.categoryCode || null, item.categoryDescription || null, item.createddate || null, item.updateddate || null ]
                break;
            case "BRAND_DATA":
                sqlText = "INSERT INTO BRAND_DATA (categoryCode, brandName, brandCode, brandDescription, createddate, updateddate) VALUES (?,?,?,?,?,?) ";
                values = [item.categoryCode || null, item.brandName || null, item.brandCode || null, item.brandDescription || null, item.createddate || null, item.updateddate || null]
                break;
            case "SUB_BRAND_DATA":
                sqlText = "INSERT INTO SUB_BRAND_DATA (brandCode, subBrandCode, name, description,size, createddate, updateddate) VALUES (?,?,?,?,?,?,?) ";
                values = [item.brandCode || null, item.subBrandCode || null, item.name || null, item.description || null, item.size || null , item.createddate || null, item.updateddate || null]
                break;
            case "SUPPLIER":
                sqlText = "INSERT INTO SUPPLIER (supplierCode, supplierName, supplierAddress,supplierPhoneno, description, createddate, updateddate) VALUES (?,?,?,?,?,?,?) ";
                values = [item.supplierCode || null, item.supplierName || null, item.supplierAddress || null, item.supplierPhoneno, item.description || null , item.createddate || null, item.updateddate || null]
                break;
            case "PURCHASE":
                sqlText = "INSERT INTO PURCHASE (purchaseCode, voucherCode, date, supplierName, supplierAddress,supplierPhone,categoryCode,  brandCode, subBrandCode, size, quantity, purchase, isRetail, isWholeSale, retailPrice, wholeSalePrice, totalAmount, createddate, updateddate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ";
                values = [item.purchaseCode || null, item.voucherCode || null, item.date || null, item.supplierName || null, item.supplierAddress || null, item.supplierPhone || null,item.categoryCode || null, item.brandCode || null, item.subBrandCode || null, item.size || null, item.quantity || null, item.purchase || null, item.isRetail || null, item.isWholeSale || null, item.retailPrice || null, item.wholeSalePrice || null,item.totalAmount || null , item.createddate || null, item.updateddate || null]
                break;
            case "ITEM_PRICE":
                sqlText = "INSERT INTO ITEM_PRICE (itemPriceCode, brandCode, subBrandCode, size, retailPrice, wholeSalePrice, createddate, updateddate) VALUES (?,?,?,?,?,?,?,?) ";
                values = [item.itemPriceCode || null,item.brandCode || null, item.subBrandCode || null, item.size || null, item.retailPrice || null, item.wholeSalePrice || null, item.createddate || null, item.updateddate || null]
                break;
            case "SIZE":
                sqlText = "INSERT INTO SIZE (code, value, createddate, updateddate) VALUES (?,?,?,?) ";
                values = [item.code || null, item.value || null, item.createddate || null, item.updateddate || null]
                break;
            default:
                return;

        }
        let query = new Query(sqlText, values);
       // console.log("query", query);
        let res = this.database_instance.executeSql(query);
    }


    public update(tableName, item) {
        let sqlText;
        let values;
        switch (tableName) {
            case "CATEGORY":
                sqlText = "UPDATE CATEGORY SET (categoryName , categoryCode , categoryDescription ,createddate, updateddate) = ( ? , ? , ? ,? ,?) where categoryCode = ? ;";
                values = [item.categoryName || null, item.categoryCode || null, item.categoryDescription || null, item.createddate || null, item.updateddate || null, item.categoryCode]
                break;
            case "BRAND_DATA":
                sqlText = "UPDATE BRAND_DATA SET (categoryCode, brandName , brandCode , brandDescription ,createddate, updateddate) = (?, ? , ? , ? ,? ,?) where brandCode = ? ;";
                values = [item.categoryCode || null, item.brandName || null, item.brandCode || null, item.brandDescription || null, item.createddate || null, item.updateddate || null, item.brandCode]
                break;
            case "SUB_BRAND_DATA":
                sqlText = "UPDATE SUB_BRAND_DATA SET (brandCode, subBrandCode, name, description,size,createddate, updateddate)  = ( ? , ? , ? , ? , ? , ? ,?) where subBrandCode = ? ;";
                values = [item.brandCode || null, item.subBrandCode || null, item.name || null, item.description || null, item.size || null, item.createddate || null, item.updateddate || null, item.subBrandCode]
                break;
            case "SUPPLIER":
                sqlText = "UPDATE SUPPLIER SET (supplierCode , supplierName, supplierAddress, supplierPhoneno , description ,createddate, updateddate) = ( ? , ? , ? , ? , ? , ? , ?) where supplierCode = ? ;";
                values = [item.supplierCode || null, item.supplierName || null, item.supplierAddress || null, item.supplierPhoneno, item.description || null, item.createddate || null, item.updateddate || null, item.supplierCode]
                break;
            case "PURCHASE":
                sqlText = "UPDATE PURCHASE SET (purchaseCode, voucherCode, date, supplierName, supplierAddress,supplierPhone,categoryCode, brandCode, subBrandCode, size, quantity, purchase, isRetail, isWholeSale, retailPrice, wholeSalePrice, totalAmount,createddate, updateddate) =  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ? , ?) where voucherCode = ? ;";
                values = [item.purchaseCode || null, item.voucherCode || null, item.date || null, item.supplierName || null, item.supplierAddress || null, item.supplierPhone || null,item.categoryCode || null, item.brandCode || null, item.subBrandCode || null, item.size || null, item.quantity || null, item.purchase || null, item.isRetail || null, item.isWholeSale || null, item.retailPrice || null, item.wholeSalePrice || null,item.totalAmount || null, item.createddate || null, item.updateddate || null, item.voucherCode]
                break;
            case "ITEM_PRICE":
                sqlText = "UPDATE ITEM_PRICE SET(itemPriceCode, brandCode, subBrandCode, size, retailPrice, wholeSalePrice, createddate, updateddate) = (?,?,?,?,?,?,?,?) where itemPriceCode = ? ;";
                values = [item.itemPriceCode || null,item.brandCode || null, item.subBrandCode || null, item.size || null, item.retailPrice || null, item.wholeSalePrice || null, item.createddate || null, item.updateddate || null, item.itemPriceCode]
                break;
            default:
                return;

        }
        let query = new Query(sqlText, values);
       // console.log("queryupdate", query);

        let res = this.database_instance.executeSql(query);

    }


    public remove(tableName, data, type) {
        let sqlText;
        let values;
        sqlText = `delete from ${tableName} where ${type} = ? `;
        values = [data || null]
        let query = new Query(sqlText, values);
        // console.log(query);

        let res = this.database_instance.executeSql(query);
    }

    async getData(tableName) {
        let data;
        switch (tableName) {
            case "CATEGORY":
                data = await this.database_instance.executeSql(new Query("SELECT * FROM CATEGORY"))
                break;
            case "BRAND_DATA":
                data = await this.database_instance.executeSql(new Query("SELECT * FROM BRAND_DATA"))
                break;
            case "SUB_BRAND_DATA":
                data = await this.database_instance.executeSql(new Query("SELECT * FROM SUB_BRAND_DATA"))
                break;
            case "SUPPLIER":
                data = await this.database_instance.executeSql(new Query("SELECT * FROM SUPPLIER"))
                break;
            case "SIZE":
                data = await this.database_instance.executeSql(new Query("SELECT * FROM SIZE"))
                break;
            case "PURCHASE":
                data = await this.database_instance.executeSql(new Query("SELECT * FROM PURCHASE"))
                break;
            case "STOCK":
                data = await this.database_instance.executeSql(new Query("SELECT * FROM STOCK LEFT JOIN PURCHASE ON STOCK.purchaseCode=PURCHASE.purchaseCode"))
                break;
            case "ITEM_PRICE":
                data = await this.database_instance.executeSql(new Query("SELECT * FROM ITEM_PRICE"))
                break;
            case "SALES":
                data = await this.database_instance.executeSql(new Query("SELECT * FROM SALES "))
                break;
            default:
                return;

        }
       // console.log("firstdata", data);
        return data
        
    }

    async getPurchaseData(purchaseCode) {
        let data = await this.database_instance.executeSql(new Query("SELECT * FROM PURCHASE WHERE purchaseCode=?", [purchaseCode]))
        return data
    }

    async getBrandByCategoryCode(categoryCode) {
        let data = await this.database_instance.executeSql(new Query("SELECT * FROM BRAND_DATA WHERE categoryCode=?", [categoryCode]))
        return data
    }

    async getSubBrandByBrandCode(brandCode) {
        let data = await this.database_instance.executeSql(new Query("SELECT * FROM SUB_BRAND_DATA WHERE brandCode=?", [brandCode]))
        return data
    }
    async getBrandByBrandCode(brandCode) {
        let data = await this.database_instance.executeSql(new Query("SELECT * FROM SUB_BRAND_DATA WHERE brandCode=?", [brandCode]))
        return data
    }
    async getSalePrice(brand,subbrand,code){
       // console.log("d", brand, subbrand, code);
        let data = await this.database_instance.executeSql(new Query("SELECT * FROM PURCHASE WHERE brandCode=? AND  subBrandCode=? AND size =? ORDER BY updateddate asc",[brand,subbrand,code]))
        //console.log("sqlquery", data);
        return data

    }
    async getSizeBysubBrandCode(subBrandCode){
        let data = await this.database_instance.executeSql(new Query("SELECT SIZE.code,SIZE.value FROM PURCHASE  LEFT JOIN SIZE ON PURCHASE.size = SIZE.code WHERE subBrandCode=? GROUP BY size", [subBrandCode]))
        //console.log("sqlquery", data);
        return data
    }
    async getSubBrand(){
        let data = await this.database_instance.executeSql(new Query("SELECT * FROM PURCHASE P LEFT JOIN SUB_BRAND_DATA B ON P.subBrandCode = B.subBrandCode GROUP BY B.subBrandCode "))
        //console.log("sqlquery", data);
        return data
    }
    async getBrand(){
        let data = await this.database_instance.executeSql(new Query("SELECT B.brandName,B.brandCode FROM PURCHASE P LEFT JOIN BRAND_DATA B ON P.brandCode = B.brandCode GROUP BY B.brandCode"))
       // console.log("sqlquery", data);
        return data
    }
    async getBrandByBrand(brandCode){
        let data = await this.database_instance.executeSql(new Query("SELECT SB.subBrandCode,SB.name FROM PURCHASE P LEFT JOIN BRAND_DATA B ON P.brandCode = B.brandCode LEFT JOIN SUB_BRAND_DATA SB ON B.brandCode = SB.brandCode WHERE P.brandCode =? GROUP BY B.brandCode", [brandCode] ))
        //console.log("sqlquery", data);
        return data
    }
    async getPriceBySize(brand,subbrand,code){
        console.log("d", brand, subbrand, code);
        let data = await this.database_instance.executeSql(new Query("SELECT retailPrice FROM ITEM_PRICE WHERE brandCode=? AND  subBrandCode=? AND size =? LIMIT 1", [brand,subbrand,code]))
        console.log("sqlw", data);
        return data
    }
    


    public createTableWithSql() {
        this.tables_data = [
            'CREATE TABLE IF NOT EXISTS CATEGORY(id INTEGER PRIMARY KEY AUTOINCREMENT,categoryName VARCHAR(25),categoryCode VARCHAR(25),categoryDescription VARCHAR(225),createddate VARCHAR(25),updateddate VARCHAR(25))',
            'CREATE TABLE IF NOT EXISTS BRAND_DATA(id INTEGER PRIMARY KEY AUTOINCREMENT,categoryCode VARCHAR(25),brandName VARCHAR(25),brandCode VARCHAR(25),brandDescription VARCHAR(225),createddate VARCHAR(25),updateddate VARCHAR(25))',
            'CREATE TABLE IF NOT EXISTS SUB_BRAND_DATA(id INTEGER PRIMARY KEY AUTOINCREMENT,brandCode VARCHAR(25),subBrandCode VARCHAR(25),name VARCHAR(25),description VARCHAR(225),size VARCHAR(25),createddate VARCHAR(25),updateddate VARCHAR(25))',
            'CREATE TABLE IF NOT EXISTS SUPPLIER(id INTEGER PRIMARY KEY AUTOINCREMENT,supplierName VARCHAR(25),supplierCode VARCHAR(25),supplierAddress VARCHAR(25),supplierPhoneno VARCHAR(25),description VARCHAR(225),createddate VARCHAR(25),updateddate VARCHAR(25))',
            'CREATE TABLE IF NOT EXISTS SIZE(id INTEGER PRIMARY KEY AUTOINCREMENT,code VARCHAR(25),value VARCHAR(25),createddate VARCHAR(25),updateddate VARCHAR(25))',
            'CREATE TABLE IF NOT EXISTS PURCHASE(id INTEGER PRIMARY KEY AUTOINCREMENT,purchaseCode VARCHAR(25),voucherCode VARCHAR(25),date VARCHAR(25),supplierName VARCHAR(25),supplierPhone VARCHAR(25),categoryCode VARCHAR(25),supplierAddress VARCHAR(25),brandCode VARCHAR(25),subBrandCode VARCHAR(25),size VARCHAR(25),quantity VARCHAR(25),purchase VARCHAR(25),isRetail VARCHAR(25),isWholeSale VARCHAR(25),retailPrice VARCHAR(25),wholeSalePrice VARCHAR(25),totalAmount VARCHAR(25),createddate VARCHAR(25),updateddate VARCHAR(25))',
            'CREATE TABLE IF NOT EXISTS STOCK(id INTEGER PRIMARY KEY AUTOINCREMENT,stockCode VARCHAR(25),purchaseCode VARCHAR(25),date VARCHAR(25),brandCode VARCHAR(25),subBrandCode VARCHAR(25),size VARCHAR(25),quantity VARCHAR(25),purchase VARCHAR(25),retailPrice VARCHAR(25),wholeSalePrice VARCHAR(25),status VARCHAR(25),createddate VARCHAR(25),updateddate VARCHAR(25))',
            'CREATE TABLE IF NOT EXISTS ITEM_PRICE(id INTEGER PRIMARY KEY AUTOINCREMENT,itemPriceCode VARCHAR(25),brandCode VARCHAR(25),subBrandCode VARCHAR(25),size VARCHAR(25),retailPrice VARCHAR(25),wholeSalePrice VARCHAR(25),createddate VARCHAR(25),updateddate VARCHAR(25))',
            'CREATE TABLE IF NOT EXISTS SALES(id INTEGER PRIMARY KEY AUTOINCREMENT,saleitemCode VARCHAR(25),saleVoucherCode VARCHAR(25),saledate VARCHAR(25),staffName VARCHAR(25),isRetail VARCHAR(25),isWholeSale VARCHAR(25),netAmount VARCHAR(25),totalDiscount VARCHAR(25),isTax VARCHAR(25),totalTax VARCHAR(25),balance VARCHAR(25),createddate VARCHAR(25),updateddate VARCHAR(25))',
            'CREATE TABLE IF NOT EXISTS SALES_ITEM(id INTEGER PRIMARY KEY AUTOINCREMENT,saleitemCode VARCHAR(25),saleVoucherCode VARCHAR(25),subBrandCode VARCHAR(25),quantity VARCHAR(25),price VARCHAR(25),discountAmount VARCHAR(25),totalAmount VARCHAR(25))',
        ];
    }

    async initData() {
        let data = await this.database_instance.executeSql(new Query("SELECT * FROM BRAND_DATA"))
        if (data.length == 0) {
            this.http.get('assets/dummy_data.sql', { responseType: 'text' }).subscribe(sql => {
                if (this.platform.is('ios') || this.platform.is('android')) {
                    this.sqlitePorter.importSqlToDb(this.database, sql)
                        .then(async (data) => {
                        })
                        .catch(e => console.error(e));
                } else {
                    let data_list = sql.split(';');
                    for (var i = 0; i < data_list.length; i++) {
                        // console.log(data_list);

                        this.database_instance.executeSql(new Query(data_list[i] + ''), []);
                    }

                }
            });
        }
    }

}




export class Query {
    private _queryString: string;
    private _parameter: (string | number)[];
    constructor(queryString: string, parameter?: (string | number)[]) {
        this._queryString = queryString;
        if (parameter instanceof Array) {
            this._parameter = parameter;
        } else if (parameter === undefined) {
            this._parameter = [];
        } else {
            this._parameter = [parameter]
        }
    }

    get queryString() {
        return this._queryString;
    }

    get parameter() {
        return this._parameter;
    }

    getStatement(): any {
        if (this._parameter !== null) {
            return [this._queryString, this._parameter]
        } else {
            return this._queryString;
        }
    }
}


export const browserDBInstance = (db) => {
    return {
        executeSql: (query: Query) => {
            return new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(query.queryString, query.parameter, (tx, rs) => {
                        let resultSet = [];
                        for (let i = 0; i < rs.rows.length; i++) {
                            resultSet.push(rs.rows.item(i));
                        }
                        resolve(resultSet)
                        //resolve(rs)
                    });
                });
            })
        },
        sqlBatch: (arr) => {
            return new Promise((r, rr) => {
                let batch = [];
                db.transaction((tx) => {
                    for (let i = 0; i < arr.length; i++) {
                        batch.push(new Promise((resolve, reject) => {
                            tx.executeSql(arr[i], [], () => { resolve(true) })
                        }))
                        Promise.all(batch).then(() => r(true));
                    }
                });
            })
        }
    }

}

export class DatabaseError implements Error {
    public name = 'DatabaseError';
    constructor(public message: string, public error: any) { }
    toString() {
        return this.name + ': ' + this.message + '\n' + this.error;
    }


}





