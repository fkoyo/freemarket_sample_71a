class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :name,  null: false
      t.text :content, null: false
      t.references :category, null: false, foreign_key: true
      t.text :brand, null: false
      t.integer :condition_id, null: false
      t.integer :fee_id, null: false
      t.integer :area_id, null: false
      t.integer :shippingday_id, null: false
      t.integer :price, null: false
      t.integer :status
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
