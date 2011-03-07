class CreateProducts < ActiveRecord::Migration
  def self.up
    create_table :products do |t|
      t.string :ref
      t.string :desc
      t.decimal :price_buy
      t.decimal :price_sell
      t.integer :user_id

      t.timestamps
    end
  end

  def self.down
    drop_table :products
  end
end
