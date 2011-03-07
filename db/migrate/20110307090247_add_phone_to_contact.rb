class AddPhoneToContact < ActiveRecord::Migration
  def self.up
    add_column :contacts, :phone, :string
    add_column :contacts, :fax, :string
  end

  def self.down
    remove_column :contacts, :phone
    remove_column :contacts, :fax
  end
end
