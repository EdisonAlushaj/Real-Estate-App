using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Application.DTO;

namespace Application.Features.Accounts
{
    public class LoginFeatures
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly TokenHelper _tokenHelper;

        public LoginFeatures(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, TokenHelper tokenHelper)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _tokenHelper = tokenHelper;
        }

        public async Task<LoginResultDTO> AuthenticateUser(Login loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.Username);

            if (user == null)
            {
                return LoginResultDTO.Failure("User not found");
            }

            if (!await _userManager.CheckPasswordAsync(user, loginDTO.Password))
            {
                return LoginResultDTO.Failure("Password incorrect.");
            }

            var token = _tokenHelper.GenerateTokenAsync(user);
            
            return LoginResultDTO.Success(await token);
        }
    }
}
