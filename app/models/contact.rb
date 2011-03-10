class Contact < ActiveRecord::Base
  belongs_to :user
  has_many :invoices
  
end
