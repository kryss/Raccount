class CreateContacts < ActiveRecord::Migration
  def self.up
    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.integer :user_id
      t.integer :contact_type
      t.string :note

      t.timestamps
    end
  end

  def self.down
    drop_table :contacts
  end
end
