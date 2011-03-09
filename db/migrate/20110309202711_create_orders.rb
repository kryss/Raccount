class CreateOrders < ActiveRecord::Migration
  def self.up
    create_table :orders do |t|
      t.integer :invoice_id
      t.integer :product_id
      t.integer :quantity
      t.decimal :unit_price

      t.timestamps
    end
    add_index :orders, :invoice_id    
  end

  def self.down
    drop_table :orders
  end
end
