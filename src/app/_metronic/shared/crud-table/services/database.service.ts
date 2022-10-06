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
                sqlText = "INSERT INTO CATEGORY (categoryName, categoryCode, categoryDescription) VALUES (?,?,?) ";
                values = [item.categoryName || null, item.categoryCode || null, item.categoryDescription || null]
                break;
            case "BRAND_DATA":
                sqlText = "INSERT INTO BRAND_DATA (categoryCode, brandName, brandCode, brandDescription) VALUES (?,?,?,?) ";
                values = [item.categoryCode || null, item.brandName || null, item.brandCode || null, item.brandDescription || null]
                break;
            case "SUB_BRAND_DATA":
                sqlText = "INSERT INTO SUB_BRAND_DATA (brandCode, subBrandCode, name, description,size) VALUES (?,?,?,?,?) ";
                values = [item.brandCode || null, item.subBrandCode || null, item.name || null, item.description || null, item.size || null]
                break;
            case "SUPPLIER":
                sqlText = "INSERT INTO SUPPLIER (supplierCode, supplierName, supplierAddress,supplierPhoneno, description) VALUES (?,?,?,?,?) ";
                values = [item.supplierCode || null, item.supplierName || null, item.supplierAddress || null, item.supplierPhoneno, item.description || null]
                break;
            case "PURCHASE":
                sqlText = "INSERT INTO PURCHASE (purchaseCode, voucherCode, date, supplierName, supplierAddress,supplierPhone,categoryCode,  brandCode, subBrandCode, size, quantity, purchase, isRetail, isWholeSale, retailPrice, wholeSalePrice, totalAmount) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ";
                values = [item.purchaseCode || null, item.voucherCode || null, item.date || null, item.supplierName || null, item.supplierAddress || null, item.supplierPhone || null,item.categoryCode || null, item.brandCode || null, item.subBrandCode || null, item.size || null, item.quantity || null, item.purchase || null, item.isRetail || null, item.isWholeSale || null, item.retailPrice || null, item.wholeSalePrice || null,item.totalAmount || null]
                break;
            case "SIZE":
                sqlText = "INSERT INTO SIZE (code, value) VALUES (?,?) ";
                values = [item.code || null, item.value]
                break;
            default:
                return;

        }
        let query = new Query(sqlText, values);
        console.log("query", query);
        let res = this.database_instance.executeSql(query);
    }


    public update(tableName, item) {
        let sqlText;
        let values;
        switch (tableName) {
            case "CATEGORY":
                sqlText = "UPDATE CATEGORY SET (categoryName , categoryCode , categoryDescription ) = ( ? , ? , ? ) where categoryCode = ? ;";
                values = [item.categoryName || null, item.categoryCode || null, item.categoryDescription || null, item.categoryCode]
                break;
            case "BRAND_DATA":
                sqlText = "UPDATE BRAND_DATA SET (categoryCode, brandName , brandCode , brandDescription ) = (?, ? , ? , ? ) where brandCode = ? ;";
                values = [item.categoryCode || null, item.brandName || null, item.brandCode || null, item.brandDescription || null, item.brandCode]
                break;
            case "SUB_BRAND_DATA":
                sqlText = "UPDATE SUB_BRAND_DATA SET (brandCode, subBrandCode, name, description,size)  = ( ? , ? , ? , ? , ? ) where subBrandCode = ? ;";
                values = [item.brandCode || null, item.subBrandCode || null, item.name || null, item.description || null, item.size || null, item.subBrandCode]
                break;
            case "SUPPLIER":
                sqlText = "UPDATE SUPPLIER SET (supplierCode , supplierName, supplierAddress, supplierPhoneno , description ) = ( ? , ? , ? , ? , ? ) where supplierCode = ? ;";
                values = [item.supplierCode || null, item.supplierName || null, item.supplierAddress || null, item.supplierPhoneno, item.description || null, item.supplierCode]
                break;
            case "PURCHASE":
                sqlText = "UPDATE PURCHASE SET (purchaseCode, voucherCode, date, supplierName, supplierAddress,supplierPhone,categoryCode, brandCode, subBrandCode, size, quantity, purchase, isRetail, isWholeSale, retailPrice, wholeSalePrice, totalAmount) =  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) where voucherCode = ? ;";
                values = [item.purchaseCode || null, item.voucherCode || null, item.date || null, item.supplierName || null, item.supplierAddress || null, item.supplierPhone || null,item.categoryCode || null, item.brandCode || null, item.subBrandCode || null, item.size || null, item.quantity || null, item.purchase || null, item.isRetail || null, item.isWholeSale || null, item.retailPrice || null, item.wholeSalePrice || null,item.totalAmount || null, item.voucherCode]
                break;
            default:
                return;

        }
        let query = new Query(sqlText, values);
        console.log("queryupdate", query);

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
                data = await this.database_instance.executeSql(new Query("SELECT * FROM STOCK"))
                break;
            default:
                return;

        }
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


    public createTableWithSql() {
        this.tables_data = [
            'CREATE TABLE IF NOT EXISTS CATEGORY(id INTEGER PRIMARY KEY AUTOINCREMENT,categoryName VARCHAR(25),categoryCode VARCHAR(25),categoryDescription VARCHAR(225))',
            'CREATE TABLE IF NOT EXISTS BRAND_DATA(id INTEGER PRIMARY KEY AUTOINCREMENT,categoryCode VARCHAR(25),brandName VARCHAR(25),brandCode VARCHAR(25),brandDescription VARCHAR(225))',
            'CREATE TABLE IF NOT EXISTS SUB_BRAND_DATA(id INTEGER PRIMARY KEY AUTOINCREMENT,brandCode VARCHAR(25),subBrandCode VARCHAR(25),name VARCHAR(25),description VARCHAR(225),size VARCHAR(25))',
            'CREATE TABLE IF NOT EXISTS SUPPLIER(id INTEGER PRIMARY KEY AUTOINCREMENT,supplierName VARCHAR(25),supplierCode VARCHAR(25),supplierAddress VARCHAR(25),supplierPhoneno VARCHAR(25),description VARCHAR(225))',
            'CREATE TABLE IF NOT EXISTS SIZE(id INTEGER PRIMARY KEY AUTOINCREMENT,code VARCHAR(25),value VARCHAR(25))',
            'CREATE TABLE IF NOT EXISTS PURCHASE(id INTEGER PRIMARY KEY AUTOINCREMENT,purchaseCode VARCHAR(25),voucherCode VARCHAR(25),date VARCHAR(25),supplierName VARCHAR(25),supplierPhone VARCHAR(25),categoryCode VARCHAR(25),supplierAddress VARCHAR(25),brandCode VARCHAR(25),subBrandCode VARCHAR(25),size VARCHAR(25),quantity VARCHAR(25),purchase VARCHAR(25),isRetail VARCHAR(25),isWholeSale VARCHAR(25),retailPrice VARCHAR(25),wholeSalePrice VARCHAR(25),totalAmount VARCHAR(25))',
            'CREATE TABLE IF NOT EXISTS STOCK(id INTEGER PRIMARY KEY AUTOINCREMENT,stockCode VARCHAR(25),purchaseCode VARCHAR(25),date VARCHAR(25),brandCode VARCHAR(25),subBrandCode VARCHAR(25),size VARCHAR(25),quantity VARCHAR(25),purchase VARCHAR(25),retailPrice VARCHAR(25),wholeSalePrice VARCHAR(25),status VARCHAR(25))',
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





