class CreateClients < ActiveRecord::Migration
  def self.up
    create_table :clients do |t|
      t.string :name
      t.string :email
      t.integer :user_id

      t.timestamps
    end
  end

  def self.down
    drop_table :clients
  end
end
