import { Column, PrimaryKey, Table, Model } from "sequelize-typescript";


@Table({
  tableName: 'products',
  timestamps: false,
})
export default class ProductModel extends Model {
  
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;
  
  @Column({ allowNull: false })
  declare price: number;
}


// 042c23481f20
// 4C512301245A630E