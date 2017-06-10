class UsersController < ApplicationController
  before_action :authenticate_user!
  
  def index
    
  end
  
  # GET to /users/:id
  def show
    @user = User.find( params[:id] )
    redirect_to(root_url) unless @user.profile
  end
end

