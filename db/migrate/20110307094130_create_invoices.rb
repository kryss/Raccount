class CreateInvoices < ActiveRecord::Migration
  def self.up
    create_table :invoices do |t|
      t.integer :contact_id
      t.integer :invoice_type
      t.integer :invoice_num
      t.boolean :is_paid
      t.date :date
      t.date :date_due
      t.integer :tax_rate
      t.decimal :sub_total
      t.decimal :total
      t.string :note
      t.string :paid_type
      t.date :paid_at
      t.boolean :is_simple_invoice
      t.integer :user_id

      t.timestamps
    end
  end

  def self.down
    drop_table :invoices
  end
end
