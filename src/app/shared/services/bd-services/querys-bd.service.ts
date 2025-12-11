import { Injectable } from '@angular/core';
import { db, Tables } from '../database.service';
// import axios from 'axios';

@Injectable({
    providedIn: 'root',
})
export class QuerysBdService {
    async bulkAdd<T>(table: Tables, res: T[]) {
        await db[table].clear();
        try {
            await db[table].bulkAdd(
                res.map((p: any) => ({
                    id: p.id,
                    object: JSON.stringify(p),
                }))
            );
            console.log(table + ' agregados con éxito.');
        } catch (error) {
            console.error(`Error al agregar ${table}:`, error);
        }
    }

    async getItem<T>(
        table: string,
        campo: string,
        value: number,
        onlyObject = true
    ) {
        const res = await db[table].where(campo).equals(value).first();
        return onlyObject ? JSON.parse(res.object) : res;
    }

    async getLastSync<T>() {
        const res = await db[Tables.sync].toArray();
        return res.length ? res[0] : null;
    }

    async getLastConfig<T>() {
        const res = await db[Tables.configBd].toArray();
        return res.length ? res[0] : null;
    }

    /**
     * Obtiene un listado de la bd local
     * @returns
     */
    async getItems<T>(
        table: Tables,
        where?: {
            campo: string;
            value: any;
        }
    ): Promise<T[]> {
        if (where) {
            return await db[table]
                .where(where.campo)
                .equals(where.value)
                .toArray()
                .then((data) => {
                    return data.map((item) => JSON.parse(item.object));
                });
        }

        const res = await db[table].toArray().then((data) => {
            return data.map((item) => JSON.parse(item.object));
        });

        return res;
    }

    /**
     * Obtiene un conteo de la bd local
     * @returns
     */
    async getCount<T>(
        table: Tables,
        where?: {
            campo: string;
            value: string | number;
        }
    ) {
        if (where) {
            return await db[table]
                .where(where.campo)
                .equals(where.value)
                .count();
        }

        const res = await db[table].count();
        return res;
    }

    async addItem(table: Tables, object: any) {
        return await db[table].add(object);
    }

    async updateItem<T>(table: Tables, id: number, data: Partial<T>) {
        try {
            const updated = await db[table].update(id, data);
            if (updated) {
                console.log(`${table} ${id} actualizado correctamente.`);
            } else {
                console.log(`No se encontró el ${table} ${id}.`);
            }
        } catch (error) {
            console.error(`Error al actualizar :${table}`, error);
        }
    }

    async updateBulk<T>(table: Tables, data: Partial<T>) {
        try {
            const array = await db[table].toArray();
            const toUpdate = array.map((item) => ({
                ...item,
                ...data, // Aplicar los nuevos valores
            }));
            await db[table].bulkPut(toUpdate); // Guardar los cambios
        } catch (error) {
            console.error(`Error al actualizar bulk :${table}`, error);
        }
    }

    async deleteItem(table: Tables, campo: string, value: number) {
        try {
            await db[table].where(campo).equals(value).delete();
            console.log(`${table} ${value} eliminado correctamente.`);
        } catch (error) {
            console.error(`Error al eliminar ${table}:`, error);
        }
    }

    async clear(table: Tables) {
        await db[table].clear();
    }

    async deleteBd() {
        await db.delete();
        console.log('bd eliminada');
    }
    async createBd() {
        await db.open();
        console.log('bd creada');
    }
}

export enum synced {
    true = 1,
    false = 0,
}
