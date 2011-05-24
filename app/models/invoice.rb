class Invoice < ActiveRecord::Base
  belongs_to :user
  has_many :orders
  has_many :products, :through => :orders
  belongs_to :contact
  
  
  def calc_total
    subtotal = 0.0
    self.orders.each do |o|
      subtotal += o.unit_price.to_f * o.quantity
    end
    self.sub_total = subtotal
    if self.tax_rate.nil?
      self.tax_rate = 0
      self.total = subtotal
    else
      self.total = subtotal * (1 + self.tax_rate) 
    end
    self.save
  end
end
